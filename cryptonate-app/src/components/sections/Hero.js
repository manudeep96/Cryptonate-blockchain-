import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import dog from '../../assets/images/dog.jpeg';
import getWeb3 from "web3";
import Cryptonate from "../../Cryptonate.json";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const onDonate = async () => {
    const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkID = await web3.eth.net.getID();
      const deployedNetwork = Cryptonate.networks[networkID];
      const instance = new web3.eth.Contract(Cryptonate.abi, deployedNetwork && deployedNetwork.address)
      instance.methods.registerDonations(accounts[0],2).send({from: accounts[1],value: 20});
  };

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Crypto<span className="text-color-primary">nate</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Your generous donation can give helpless animals a new life. Donate to animal charities NOW !
                </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                {/* <ButtonGroup> */}
                  <button tag="a" color="primary" onClick={onDonate()}>
                    Donate
                    </button>
                  
                {/* </ButtonGroup> */}
                <div>
                <img src={dog} alt="dog"/>
                </div>
               
                
                
              </div>
             
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
  
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;