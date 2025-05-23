import React, { Component } from 'react';
import Button from '../Button';
import type { ButtonSmallProps } from '@/types/app';

class BtnSmallEdit extends Component<ButtonSmallProps> {
    render(): React.ReactNode {
        return (
            <Button
                b_color="blue"
                color="white"
                title="Edit"
                small="true"
                round="true"
                callbackValue={this.props.callbackValue}
                index={this.props.index}
                callback={this.props.callback}
                className="button__icon-table"
            >
                <i className="material-icons">edit</i>
            </Button>
        );
    }
}

export default BtnSmallEdit;
