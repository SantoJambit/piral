import * as React from 'react';
import { Feature } from './Feature';

export const Features: React.FC = () => (
  <div className="jumbotron jumbotron-fluid features">
    <Feature title="Take a look inside" image={require('../../assets/feature-1.png')}>
      <p className="my-4">
        Keen to see how Piral looks in practice? Watch our introductory video.
        <br /> The video shows what Piral can give you out of the box already.
      </p>
      <a href="https://youtu.be/SkKvpBHy_5I" className="btn my-4 font-weight-bold atlas-cta cta-blue">
        Watch Video
      </a>
    </Feature>
    <Feature title="Business ready" image={require('../../assets/feature-2.png')} reverse>
      <p className="my-4">
        Like what you see and want to take it to the next level?
        <br /> We have different support options and plans to offer if you need professional help.
      </p>
      <a href="https://smapiot.com/products/piral" className="btn my-4 font-weight-bold atlas-cta cta-blue">
        See Options
      </a>
    </Feature>
    <Feature title="Easy to reach" image={require('../../assets/feature-3.png')}>
      <p className="my-4">
        Do you have a question? Do you need support or more guidance?
        <br /> We are always easy to reach and open for discussions. We love our community!
      </p>
      <a href="https://gitter.im/piral-io/community" className="btn my-4 font-weight-bold atlas-cta cta-blue">
        Contact Us
      </a>
    </Feature>
  </div>
);
