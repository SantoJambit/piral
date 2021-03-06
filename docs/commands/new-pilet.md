# `new-pilet`

<!--start:auto-generated-->

Scaffolds a new pilet for a specified Piral instance.

## Syntax

From the command line:

```sh
pb new-pilet [source]
```

## Aliases

Instead of `new-pilet` you can also use:

- `create-pilet`
- `scaffold-pilet`
- `scaffold`
- `new`
- `create`

## Positionals

### `source`

Sets the source package containing a Piral instance for templating the scaffold process.

- Type: `string`
- Default: `piral`

## Flags

### `--target`

Sets the target directory for scaffolding. By default, the current directory.

- Type: `string`
- Default: `"."`

### `--registry`

Sets the package registry to use for resolving the specified Piral app.

- Type: `string`
- Default: `"https://registry.npmjs.org/"`

### `--force-overwrite`

Determines if files should be overwritten by the scaffolding.

- Type: `string`
- Choices: `"no"`, `"prompt"`, `"yes"`
- Default: `"no"`

### `--language`

Determines the programming language for the new pilet.

- Type: `string`
- Choices: `"ts"`, `"js"`
- Default: `"ts"`

### `--base`

Sets the base directory. By default the current directory is used.

- Type: `string`
- Default: `process.cwd()`

<!--end:auto-generated-->
