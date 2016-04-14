import React from 'react'

var GistEmbed = React.createClass({
  propTypes: {
    gist: React.PropTypes.string.isRequired, // e.g. "username/id"
    file: React.PropTypes.string // to embed a single specific file from the gist
  },

  statics: {
    // Each time we request a Gist, we'll need to generate a new
    // global function name to serve as the JSONP callback.
    gistCallbackId: 0,
    nextGistCallback: function() {
      return "embed_gist_callback_" + GistEmbed.gistCallbackId++;
    },

    // The Gist JSON data includes a stylesheet to add to the page
    // to make it look correct. `addStylesheet` ensures we only add
    // the stylesheet one time.
    stylesheetAdded: false,
    addStylesheet: function(href) {
      if (!GistEmbed.stylesheetAdded) {
        GistEmbed.stylesheetAdded = true;
        var link = document.createElement('link');
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = href;

        document.head.appendChild(link);
      }
    }
  },

  getInitialState: function() {
    return {
      loading: true,
      src: ""
    };
  },

  componentDidMount: function() {
    // Create a JSONP callback that will set our state
    // with the data that comes back from the Gist site
    var gistCallback = GistEmbed.nextGistCallback();
    window[gistCallback] = function(gist) {
      if (this.isMounted()) {
        this.setState({
          loading: false,
          src: gist.div
        });
        GistEmbed.addStylesheet(gist.stylesheet);
      }
    }.bind(this);

    var url = "https://gist.github.com/" + this.props.gist + ".json?callback=" + gistCallback;
    if (this.props.file) {
      url += "&file=" + this.props.file;
    }

    // Add the JSONP script tag to the document.
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
  },

  render() {
    if (this.state.loading) {
      return null
    } else {
      return <div dangerouslySetInnerHTML={{__html: this.state.src}} />
    }
  }
});

export default GistEmbed
