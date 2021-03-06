# Piral Package Metadata

The Piral CLI uses the *package.json* file for retrieving useful information. This includes - in case of a pilet - the specific Piral instance to use, or (from a Piral instance) the shared dependencies to be used in pilets.

## Piral Instance - Package Extensions

The additional fields for a Piral instance package are as follows:

```json
{
  "name": "my-piral-instance",
  // ...
  "app": "src/index.html",
  "pilets": {
    "externals": [
      "my-ui-lib"
    ],
    "files": [
      ".editorconfig"
    ],
    "scripts": {
      "publish-pilet": "pilet publish --api-key $PILET_PUBLISH_KEY"
    },
    "devDependencies": {
      "prettier": "^1.16.4"
    }
  }
}
```

The `pilets` field is completely optional. The `app` field is necessary to signal the HTML file to be used as entry point to the Piral CLI. All paths are relative to the *package.json*.

The names in the list of `externals` need to be aligned with the names of the dependencies in the `dependencies` field. These dependencies will be available to pilets as `peerDependencies` (or "externals"). Furthermore, the Piral CLI will instruct these dependencies to be fully included in the app.

The list of `files` contains paths to files relative to the `package.json` that should be copied to the pilet when scaffolding (or upgrading). The idea here is to include common files such as an `.editorconfig`, custom `tsconfig.json`, `tslint.json`, or others to provide some coherence when creating new repositories with pilets.

**Note**: Depending on the development model no special files may be wanted, e.g., in a monorepo workflow all essential configuration files such as an *.editorconfig* are already present in the repository's root directory.

The determined `scripts` provide an easy way to extend the scripts section of the `package.json` of a new pilet. The reason for this section is - like the `files` section - coherence. Likewise, the `devDependencies` can be used to inject some additional tools into a scaffolded pilet, e.g., a preferred solution for unit test, linting, or style coherence.

**Remark**: The difference between the `devDependencies` (format like in the *package.json* - names with semver constraints) and the `externals` (just names, no version constraints) is explained fairly simple: every name mentioned in `externals` needs to be also present in the provided Piral instance (i.e., needs to occur in `dependencies` with a semver constraint), however, the `devDependencies` for a pilet do not need to be present in the Piral instance at all - thus specifying the semver constraint is necessary.

## Pilets - Package Extensions

The additional fields for a pilet package are as follows:

```json
{
  "name": "my-awesome-pilet",
  // ...
  "piral": {
    "comment": "Warning to not remove it - no functional consequence.",
    "name": "my-piral-instance",
    "version": "1.0.0",
    "tooling": "1.2.3",
    "externals": [
      "my-ui-lib"
    ],
    "scripts": {
      "publish-pilet": "pilet publish --api-key $PILET_PUBLISH_KEY"
    },
    "files": [
      ".editorconfig"
    ],
    "devDependencies": {
      "prettier": "^1.16.4"
    }
  },
}
```

The `externals`, `scripts`, `devDependencies`, and `files` are added to simplify diffing during an upgrade of the Piral app. Likewise, the `tooling` (version of the used Piral CLI) and `version` (version of the used Piral instance) are informative only. The name of the Piral instance is used to find the right entry point for debugging.

**Remark**: The `piral` field is exclusively used by the Piral CLI. For information regarding what might be picked up by a feed service implementation see the specification of a pilet, which discusses all fields in depth.
