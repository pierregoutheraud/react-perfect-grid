import React from 'react'

// Detect when scrollbar appears
var ScrollBarAdapter = React.createClass({
    onResize() {
        if (this.props.onResize) {
            this.props.onResize();
            return;
        }
        try {
          var evt = new UIEvent('resize');
          window.dispatchEvent(evt);
        } catch(e) {}
    },

    componentDidMount() {
        this.refs.frame.contentWindow.addEventListener('resize', this.onResize, false);
    },
    componentWillUnmount() {
        this.refs.frame.contentWindow.removeEventListener('resize', this.onResize);
    },
    render(){
        var styles = {
            height: 0,
            margin: 0,
            padding: 0,
            overflow: "hidden",
            borderWidth: 0,
            position: "absolute",
            backgroundColor: "transparent",
            width: "100%",
            left: 0,
            right: 0
        };
        return (
            <iframe classNames="ScrollBarAdapter" ref="frame" style={styles} />
        );
    }
});

export default ScrollBarAdapter
