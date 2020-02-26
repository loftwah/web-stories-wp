/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { InputGroup } from '../form';
import { SimplePanel } from './panel';
import getCommonValue from './utils/getCommonValue';

function BackgroundColorPanel({ selectedElements, onSetProperties }) {
  const backgroundColor = getCommonValue(selectedElements, 'backgroundColor');
  const backgroundOpacity = getCommonValue(
    selectedElements,
    'backgroundOpacity'
  );
  const [state, setState] = useState({ backgroundColor, backgroundOpacity });
  useEffect(() => {
    setState({ backgroundColor, backgroundOpacity });
  }, [backgroundColor, backgroundOpacity]);
  const handleSubmit = (evt) => {
    onSetProperties(state);
    evt.preventDefault();
  };

  return (
    <SimplePanel
      name="bgcolor"
      title={__('Background color', 'web-stories')}
      onSubmit={handleSubmit}
    >
      <InputGroup
        type="color"
        label={__('Background color', 'web-stories')}
        value={state.backgroundColor}
        isMultiple={backgroundColor === ''}
        onChange={(value) => setState({ ...state, backgroundColor: value })}
      />
      <InputGroup
        type="number"
        label={__('Background Opacity', 'web-stories')}
        value={state.backgroundOpacity}
        isMultiple={'' === backgroundOpacity}
        onChange={(value) => setState({ ...state, backgroundOpacity: value })}
        postfix={_x('%', 'Percentage', 'web-stories')}
        min="1"
        max="100"
      />
    </SimplePanel>
  );
}

BackgroundColorPanel.propTypes = {
  selectedElements: PropTypes.array.isRequired,
  onSetProperties: PropTypes.func.isRequired,
};

export default BackgroundColorPanel;