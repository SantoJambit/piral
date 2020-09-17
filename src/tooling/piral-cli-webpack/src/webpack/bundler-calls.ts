import { resolve } from 'path';
import { fork, ChildProcess } from 'child_process';
import { Bundler, BundleDetails, BaseBundleParameters } from 'piral-cli';

function getPath(name: string) {
  return resolve(__dirname, '..', '..', 'lib', 'webpack', `run-${name}.js`);
}

type BundleListener = (args: any) => void;

function createBundler(cwd: string, ps: ChildProcess, args: any) {
  let promise = Promise.resolve();
  const listeners: Array<BundleListener> = [];
  const bundle: BundleDetails = {
    dir: cwd,
    hash: '',
    name: '',
  };
  const setPending = () => {
    promise = new Promise((done) => {
      const f = () => {
        done();
        bundler.off(f);
      };
      bundler.on(f);
    });
  };
  const bundler = {
    bundle,
    start() {
      ps.send({
        type: 'bundle',
        ...args,
      });
    },
    on(cb: BundleListener) {
      listeners.push(cb);
    },
    off(cb: BundleListener) {
      listeners.splice(listeners.indexOf(cb), 1);
    },
    emit(args: any) {
      [...listeners].forEach((cb) => cb(args));
    },
    ready() {
      return promise;
    },
    setPending,
  };
  setPending();
  return bundler;
}

export function callDynamic<T extends BaseBundleParameters>(name: string, args: T) {
  const cwd = args.root;
  return new Promise<Bundler>((resolve, reject) => {
    const ps = fork(getPath(name), [], { cwd });
    const bundler = createBundler(cwd, ps, args);

    ps.on('message', (msg: any) => {
      switch (msg.type) {
        case 'pending':
          bundler.setPending();
          break;
        case 'update':
          bundler.bundle.hash = msg.outHash;
          bundler.bundle.name = msg.outName;
          bundler.emit(msg.args);
          break;
        case 'done':
          bundler.bundle.dir = msg.outDir;
          return resolve(bundler);
        case 'fail':
          return reject(msg.error);
      }
    });

    ps.send({
      type: 'start',
      ...args,
    });
  });
}

export function callStatic<T extends BaseBundleParameters>(name: string, args: T) {
  const cwd = args.root;
  return new Promise<Bundler>((resolve, reject) => {
    const ps = fork(getPath(name), [], { cwd });
    const bundler = createBundler(cwd, ps, args);

    ps.on('message', (msg: any) => {
      switch (msg.type) {
        case 'done':
          bundler.bundle.dir = msg.outDir;
          bundler.bundle.name = msg.outFile;
          return resolve(bundler);
        case 'fail':
          return reject(msg.error);
      }
    });

    ps.send({
      type: 'start',
      ...args,
    });
  });
}
