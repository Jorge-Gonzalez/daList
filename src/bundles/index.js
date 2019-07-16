import { composeBundles, createCacheBundle } from 'redux-bundler';
import routes from './routes';
import dataFromFile from './data-from-file';
import cache from '../common/cache';

export default composeBundles(dataFromFile, routes, createCacheBundle(cache.set));
