import React, { Component } from 'react';
import { Progress } from 'antd';
import Editor from 'for-editor';
import CSSAnimate from 'components/CSSAnimate';
import $$ from 'cmn-utils';
import config from '@/config';

const { notice } = config;

export default class extends Component {
    state = {
        progressVisible: false,
        progressPercent: 0,
        progressAnimate: ''
    }
    constructor() {
        super();
        this.$vm = React.createRef();
    }
    componentWillUnmount() {
        const { timerId } = this.state;
        timerId && clearTimeout(timerId);
    }
    progressStyle = {
        position: 'fixed',
        top: document.body.offsetHeight / 2 - 60,
        left: document.body.offsetWidth / 2 - 60,
        zIndex: 999999
    }
    handleUploadProgress = event => {
        const percent = event.loaded / event.total * 100 | 0;
        this.setState({
            progressPercent: percent
        });
    }
    handleAddImg = async file => {
        this.$vm.current.$img2Url(file.name, 'file_url')
    }
    handleProgressAnimate = () => {
        this.setState({
            progressVisible: false,
            progressAnimate: ''
        });
    }
    render() {
        const { progressVisible, progressPercent, progressAnimate } = this.state;
        const { addImg, upload, ...otherProps } = this.props;
        return (
            <div>
                <Editor ref={this.$vm} addImg={this.handleAddImg} {...otherProps} />
                {progressVisible &&
                    <CSSAnimate type={progressAnimate} callback={this.handleProgressAnimate} duration={500}>
                        <Progress type='circle' default='default' percent={progressPercent} style={this.progressStyle} />
                    </CSSAnimate>
                }
            </div>
        );
    }
}
