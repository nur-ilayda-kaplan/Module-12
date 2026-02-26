module.exports = {
  default: `--require-module ts-node/register \
    --require support/**/*.ts \
    --require step-definitions/**/*.ts \
    --format progress-bar \
    --publish-quiet`,
};
