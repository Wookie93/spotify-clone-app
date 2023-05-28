/// Homepage JavaScript File
/// Here we import all the JavaScript files we need for our homepage.

import '../styles/home-page.scss';
import { UserFeedbackModal } from '../components/modal-user/modal-user.js';

setTimeout(() => {
  // show UserFeedbackModal 1s after page has been loaded
  UserFeedbackModal();
}, 1000);
