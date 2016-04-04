# gulp task rules

## structure

```sh

gulp.ts/
├── README.md               # on self
├── env.ts                  # tying settings and worker
├── config                  # settings files
│   ├── _interfacees.ts
│   ├── rootPaths.ts
│   └── ...
├── events                  # gulp event tasks
│   ├── build.ts
│   ├── test.ts
│   ├── serve.ts
│   └── ...
└── workers                # gulp singule tasks
    ├── build              # wrapping in worker too large directory
    │   ├── bundle.ts
    │   ├── win.ts
    │   ├── linux.ts
    │   ├── osx.ts
    │   └── ...
    ├── copy.ts
    ├── default.ts
    ├── del.ts
    └── ...

```

## directory and files

> TODO:

### `env.ts` file

Path and port, is a module that bundling the settings of the task

### `config/` directory

Implementation contents of the `env.ts` is store.

### `events/` directory

Developer is gulp task to fire point

### `workers/` directory

Place a small gulp task
