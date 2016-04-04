
export interface IAutoprefixer {
  options: Object;
}

export interface ICsswring {
  options: {
    preserveHacks: boolean,
    removeAllComments: boolean,
  },
}

export interface IDoiuse {
  options: {
    browsers: Array<string>,
  },
}

export interface IPostcssRepoter {
  options: {
    clearMessages: boolean,
  },
}

export interface IStylelint {
  options: Object,
}