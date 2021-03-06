# `new-piral`

<!--start:auto-generated-->

Creates a new Piral instance by adding all files and changes to the current project.

## Syntax

From the command line:

```sh
pb new-piral [target]
```

## Aliases

Instead of `new-piral` you can also use:

- `create-piral`
- `scaffold-piral`
- `setup-piral`

## Positionals

### `target`

Sets the project's root directory for making the changes.

- Type: `string`
- Default: `.`

## Flags

### `--app`

Sets the path to the app's source HTML file.

- Type: `string`
- Default: `"./src/index.html"`

### `--only-core`

Sets if "piral-core" should be used. Otherwise, "piral" is used.

- Type: `boolean`
- Default: `false`

### `--tag`

Sets the tag or version of the package to install. By default, it is "latest".

- Type: `string`
- Default: `"latest"`

### `--force-overwrite`

Determines if files should be overwritten by the installation.

- Type: `string`
- Choices: `"no"`, `"prompt"`, `"yes"`
- Default: `"no"`

### `--language`

Determines the programming language for the new Piral instance.

- Type: `string`
- Choices: `"ts"`, `"js"`
- Default: `"ts"`

### `--base`

Sets the base directory. By default the current directory is used.

- Type: `string`
- Default: `process.cwd()`

<!--end:auto-generated-->
