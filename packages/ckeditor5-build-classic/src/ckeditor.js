/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import SelectAll from '@ckeditor/ckeditor5-select-all/src/selectall';
import List from '@ckeditor/ckeditor5-list/src/list';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
// import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
// import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import Table from '@ckeditor/ckeditor5-table/src/table';
// import CKBox from '@ckeditor/ckeditor5-ckbox/src/ckbox';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import Heading from '@ckeditor/ckeditor5-heading/src/heading';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';

// import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
// import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting';
// import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { icons } from '@ckeditor/ckeditor5-core';

export default class ClassicEditor extends ClassicEditorBase {}

class References extends Plugin {
	init() {
		// console.log( 'test' );
		const editor = this.editor;

		// The button must be registered among the UI components of the editor
		// to be displayed in the toolbar.
		editor.ui.componentFactory.add( 'references', () => {
		// The button will be an instance of ButtonView.
			const button = new ButtonView();

			button.set( {
				icon: icons.references,
				label: 'References', // window.polyglot.t('app.asset.editlink'),
				tooltip: true
			} );

			button.on( 'execute', () => {
				// eslint-disable-next-line no-undef
				const $modelContainer = $( '#references-modal-container' );
				$modelContainer.find( '.modal-title' ).text( 'References' ); // window.polyglot.t('app.references.title')
				// $modelContainer.find('.modal-body').text('References');
				$modelContainer.modal( {
					dismissible: false
				} );

				// on ok, write to the model
				$modelContainer.find( '.model-button-ok' ).on( 'click', () => {
					// eslint-disable-next-line no-undef
					const checked = $( 'input[name="references-list"]' ).filter( ':checked' );

					if ( checked.length === 0 ) {
						return;
					}

					// if (this.insertMode) {
					// Change the model using the model writer.
					editor.model.change( writer => {
						// writer.createElement('a', {
						// 	linkHref: '#'
						// });
						// const reference = writer.createAttributeElement( 'a', { target: '#' });
						const id = checked[ 0 ].value;
						const reference = writer.createText( '[' + id + ']' );

						writer.setAttribute( 'linkHref', '#', reference );
						writer.setAttribute( 'data-reference-link', id, reference );

						// reference.addClass('reference');

						// reference.attr('href', '#');
						// reference.attr('data-reference-link', id);

						// Insert the text at the user's current position.
						editor.model.insertContent( reference );
						//  this.editor.model.document.selection
					} );
					// }
				} );

				// const now = new Date();

				// // Change the model using the model writer.
				// editor.model.change( writer => {

				//     // Insert the text at the user's current position.
				//     editor.model.insertContent( writer.createText( now.toString() ) );
				// } );
			} );

			return button;
		} );
	}
}

class AssetLink extends Plugin {
	init() {
		// console.log( 'test' );
		const editor = this.editor;

		// The button must be registered among the UI components of the editor
		// to be displayed in the toolbar.
		editor.ui.componentFactory.add( 'assetlink', () => {
		// The button will be an instance of ButtonView.
			const button = new ButtonView();

			button.set( {
				icon: icons.assetlink,
				label: 'Asset Link', // window.polyglot.t('app.asset.editlink'),
				tooltip: true
			} );

			button.on( 'execute', () => {
				const now = new Date();

				// Change the model using the model writer.
				editor.model.change( writer => {
					// Insert the text at the user's current position.
					editor.model.insertContent( writer.createText( now.toString() ) );
				} );
			} );

			return button;
		} );
	}
}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	AssetLink,
	References,
	SourceEditing,
	Essentials,
	FindAndReplace,
	SelectAll,
	List,
	TodoList,
	Indent,
	BlockQuote,
	Alignment,
	// UploadAdapter,
	// Autoformat,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Subscript,
	Superscript,
	RemoveFormat,
	Font,
	Highlight,
	SpecialCharacters,
	Table,
	// CKBox,
	// CKFinder,
	// CloudServices,
	// EasyImage,
	// Heading,
	// Image,
	// ImageCaption,
	// ImageStyle,
	// ImageToolbar,
	// ImageUpload,
	// Indent,
	Link,
	// MediaEmbed,
	Paragraph,
	PasteFromOffice
	// PictureEditing
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	placeholder: '',
	toolbar: {
		items: [
			'assetLink', 'references',
			'sourceEditing', '|',
			'undo', 'redo', '|',
			'findAndReplace', 'selectAll', '|',
			'numberedList', 'bulletedList', 'todoList', '|', 'outdent', 'indent', '|', 'blockquote', '|',
			'alignment', '-',
			'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'removeFormat', '|',
			'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
			'specialCharacters', 'insertTable', '|'
		],
		shouldNotGroupWhenFull: true
	},
	// image: {
	// 	toolbar: [
	// 		'imageStyle:inline',
	// 		'imageStyle:block',
	// 		'imageStyle:side',
	// 		'|',
	// 		'toggleImageCaption',
	// 		'imageTextAlternative'
	// 	]
	// },
	// table: {
	// 	contentToolbar: [
	// 		'tableColumn',
	// 		'tableRow',
	// 		'mergeTableCells'
	// 	]
	// },
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
