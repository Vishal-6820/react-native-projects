/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { playbackService } from './musicPlayerServices';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
