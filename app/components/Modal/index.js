import React from 'react';
import './index.css';

/**
 * [Modal description]
 * @param  {[function]} ComposedComponent - My React.Component, which enhance Modal
 * @param  {[Object]} options - Object with options for My React.Component
 * @param  {[string]} options.className - className for Modal
 * @param  {[function]} options.closeModal - function, which close Modal, usually change property on store
 * @return {[function]} - Modal plugin
 */
export default function( ComposedComponent, options ) {
    class Modal extends React.Component {
        render() {
            const {
                className,
                closeModal
            } = options;

            return (
                <div className={'overlay ' + className}
                    onClick={(e) => {
                        if( e.target == e.currentTarget ) {
                            this.props.dispatch( closeModal( null ) );
                        }
                    }}>
                    <div className='wrapper'>
                        <div className='sub-wrapper'>
                            <ComposedComponent {...this.props}/>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return Modal;
}
