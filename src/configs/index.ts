import appConfig, { AppConfigType } from './app.config';
import debuggerConfig, { DebuggerConfigType } from './debugger.config';

export type AllConfigsType = {
  app: AppConfigType;
  debugger: DebuggerConfigType;
};
export default [appConfig, debuggerConfig];
