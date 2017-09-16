import Memory from './Memory.jsx';
import SourceCode from './SourceCode.jsx';
import React from 'react';


class MemoryLink extends React.Component {

    constructor(props){
        super();
        this.parsed_addr = `0x${parseInt(props.addr, 16).toString(16)}`  // remove leading zeros
    }
    render(){
        return (
            <span className='pointer memadr_react'
                    onClick={()=>Memory.set_inputs_from_address(this.parsed_addr)}
                    title={`click to explore memory at ${this.parsed_addr}`}
                    style={this.props.style}>
                {this.props.display_text || this.parsed_addr}
            </span>)
    }
    static defaultProps = { style: {'fontFamily': 'monospace'} }
}

class FileLink extends React.Component {
    render(){
        let onclick = null
        , cls = ''

        if(this.props.fullname){
            onclick = ()=>SourceCode.view_file(this.props.fullname, this.props.line)
            cls = 'pointer'
        }

        let sep = ''
        if(this.props.file && this.props.line){
            sep = ':'
        }

        let line_num = this.props.line
        if (!this.props.file){
            line_num = ''
        }
        return (<span onClick={onclick} className={cls} title={`click to view ${this.props.fullname}`}>
                    {this.props.file}{sep}{line_num}
                </span>)
    }
}

class FrameLink extends React.Component {
    render(){
        return (
            <div>
                <FileLink fullname={this.props.fullname} file={this.props.file} line={this.props.line} />
                <span style={{'whiteSpace': 'pre'}}> </span>
                <MemoryLink addr={this.props.addr} />
            </div>
        )
    }
}


module.exports = {
    FileLink: FileLink,
    FrameLink: FrameLink,
    MemoryLink: MemoryLink,
}
