import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import DocumentTitle from 'react-document-title';

import './index.css';

ReactDOM.render(
  (
      <DocumentTitle title='truepeacein.space | Metroid Password Generator'>
      <App />
      </DocumentTitle>
  ),
  document.getElementById('root'));
