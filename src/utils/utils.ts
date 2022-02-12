import ArrayUtils from './ArrayUtils';
import DateUtils from './DateUtils';
import DebugUtils from './DebugUtils';
import EmailUtils from './EmailUtils';
import FileUtils from './FileUtils';
import GeneralUtils from './GeneralUtils';
import LangUtils from './LangUtils';
import StringUtils from './StringUtils';
import UUIDUtils from './UUIDUtils';
import PhoneUtils from './PhoneUtils';

export default {
  ...PhoneUtils,
  ...UUIDUtils,
  ...StringUtils,
  ...LangUtils,
  ...GeneralUtils,
  ...FileUtils,
  ...EmailUtils,
  ...DebugUtils,
  ...DateUtils,
  ...ArrayUtils
};
