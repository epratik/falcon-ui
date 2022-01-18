
import React from "react";

export default class GoogleInFeedAd extends React.Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  
    render() {
        return (
            <ins class="adsbygoogle"
                style={{ display: "block" }}
                data-ad-format="fluid"
                data-ad-layout-key="-6t+ed+2i-1n-4w"
                data-ad-client="ca-pub-9694969058678294"
                data-ad-slot="1542015522">
            </ins>
        );
    }
}