/**
 * @file: index.ts
 * @description 入口文件
 */

import { init } from './init';
import { staticConf, spiderUrl } from "./config/staticConf";
init(staticConf, spiderUrl);