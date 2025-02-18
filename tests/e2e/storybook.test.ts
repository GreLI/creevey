import { after, before, describe } from 'mocha';
import {
  // assertExtractedStories,
  assertExtractedTests,
  assertWebpackBundle,
  execSync,
  prepareWorkDir,
  storybookDir,
  updateApprovals,
} from './test-helpers';

// TODO Support storiesOf variables

const workDir = `${storybookDir}/examples/official-storybook`;

describe('Storybook Official E2E', function () {
  this.timeout('300s');

  before(function () {
    prepareWorkDir(workDir);
    execSync('npm run build-storybook', { cwd: workDir });
  });

  after(async function () {
    await updateApprovals(workDir, 'storybook');
  });

  assertExtractedTests(workDir, 'storybook');

  assertWebpackBundle(workDir, 'storybook');

  // FIXME: Skip for now
  // assertExtractedStories(workDir);
});
