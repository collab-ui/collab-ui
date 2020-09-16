import React from 'react';
import { Button } from '@momentum-ui/react';
import SectionHeader from '../../components2020/SectionHeader';
import Example from '../../components2020/Example';
import locale from './locale';

class Personality extends React.PureComponent {

  render() {
    const personalityMattersLead = (
      <div>
        <p className="personality-header-lead">{locale.sectionHeaders.personalityMatters.body}</p>
        <div className="personality-attributes-bullet-list">
          {locale.attributes.map((attribute, idx) => (
            <div key={'attribute-item' + idx} className="personality-attributes-bullet">
              <div style={{backgroundColor: attribute.color}}></div>
              <p style={{color: attribute.color}}>{attribute.title}</p>
            </div>
          ))}
        </div>
        <p className="personality-header-lead">Here’s how we bring that personality to life...</p>
      </div>
    );

    const sectionDivider = (
      <hr className="personality-section-divider" />
    );

    return (
      <div className="site-con">
        <div className="site-con site-bg-black">
          <div className="site-con site-banner-con-personality">
            <div className='site-warp fix-margin site-banner-normal'>
              <p className='site-banner-normal-title'>Personality</p>
            </div>
          </div>
          <div className="page-body">
            <SectionHeader
              darkTheme
              title={locale.sectionHeaders.personalityMatters.title}
              leadElm={personalityMattersLead}
            />

            {sectionDivider}
            
            <SectionHeader
              className="personality-header-copy"
              darkTheme
              title={locale.sectionHeaders.copy.title}
              leadElm={(
                <p className="systems-header-lead">{locale.sectionHeaders.copy.body}</p>
              )}
            />
            <div className="flex-con-row personality-description-container">
              {locale.copyStructures.map((copyStructure, idx) => (
                <div className={"flex-item" + (idx > 0 ? " flex-margin" : "")}>
                  <h5>{copyStructure.title}</h5>
                  <p>{copyStructure.body}</p>
                </div>
              ))}
            </div>
            <div className="flex-con-row">
                <div className="flex-item">
                  <Example
                    subtitle="Example: Webex Teams - Onboarding (Attributes applified: Uplifting, Confident, Inclusive)"
                  >
                    <div className="personality-example-row-item">
                      <img className="site-example-image" src="/assets/2020/personality-webex-error-example.png" />
                    </div>
                  </Example>
                </div>
                <div className="flex-item flex-margin">
                  <Example
                    subtitle="Example: Webex Meetings - Error message (Attributes applified: Focused, Familiar, Inclusive)"
                  >
                    <div className="personality-example-row-item">
                      <img className="site-example-image" src="/assets/2020/personality-webex-error-example.png" />
                    </div>
                  </Example>
                </div>
            </div>
            <Example
              subtitle="Example: Webex.com"
            >
              <div className="personality-webex-example">
                <img className="site-example-image" src="/assets/2020/personality-webex-example.png" />
              </div>
            </Example>
            <div className="personality-writing-tips-container">
              <h3>Writing tips</h3>
              <div className="personality-writing-tips-grid">
                {locale.writingTips.map((writingTip, idx) => (
                  <div key={'tip-container' + idx} className="personality-writing-tips-grid__container">
                    <div className="personality-writing-tips-grid__container-inner">
                      {writingTip.title && <h4>{writingTip.title}</h4> }
                      <p>{writingTip.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p>Learn all about writing for Webex</p>
              <div className="personality-writing-tips-container__buttons">
                <Button
                  ariaLabel='Writing Tips'
                  className='md-button--dark-gray icon-button-share'
                  size={52}
                >UX Writing guidelines</Button>
                <Button
                  ariaLabel='IGithub'
                  className='md-button--dark-gray icon-button-share'
                  size={52}
                >Voice and tone</Button>
                <Button
                  ariaLabel='IGithub'
                  className='md-button--dark-gray icon-button-share'
                  size={52}
                >Tips and tricks</Button>
              </div>
            </div>

            {sectionDivider}

            <SectionHeader
              className="personality-header-illustration"
              darkTheme
              title={locale.sectionHeaders.illustration.title}
              leadElm={(
                <p className="systems-header-lead">{locale.sectionHeaders.illustration.body}</p>
              )}
            />
            <div className="flex-con-row personality-description-container">
              {locale.illustrationStyles.map((illustrationStyle, idx) => (
                <div className={"flex-item" + (idx > 0 ? " flex-margin" : "")}>
                  <h5>{illustrationStyle.title}</h5>
                  <p>{illustrationStyle.body}</p>
                </div>
              ))}
            </div>
            <div className="flex-con-row">
              <div className="flex-item">
                <Example
                  subtitle="Example: Webex Teams - Onboarding"
                >
                  <div className="personality-story-illustation-example">
                    <img src="/assets/2020/personality-webex-teams-onboarding-example.png" />
                  </div>
                </Example>
              </div>
              <div className="flex-item flex-margin">
                <Example
                  subtitle="Example: Webex.com"
                >
                  <div className="personality-technical-illustration-example">
                    <img className="site-example-image" src="/assets/2020/personality-webex-technical-illustration-example.png" />
                  </div>
                </Example>
              </div>
            </div>
            <div className="personality-illustration-tips-container">
              <h3>Illustration tips</h3>
              {locale.illustrationTips.map(illustrationTip => (
                <div className="personality-illustration-tips-container__example">
                  <p>{illustrationTip.title}</p>
                  <Example className="personality-illustration-tips-example" smallBlockSize>
                    <div className="personality-illustration-tips-example-item">
                      <img src={illustrationTip.exampleImageSrc} />
                    </div>
                  </Example>

                </div>
              ))}
              <p>Learn all about illustration</p>
              <div className="personality-illustration-tips-container__buttons">
                <Button
                  ariaLabel='Writing Tips'
                  className='md-button--dark-gray icon-button-share'
                  size={52}
                >Illustration guidelines</Button>
                <Button
                  ariaLabel='IGithub'
                  className='md-button--dark-gray icon-button-share'
                  size={52}
                >Tips and tricks</Button>
              </div>
            </div>
            
            {sectionDivider}

            <SectionHeader
              className="personality-header-motion"
              darkTheme
              title={locale.sectionHeaders.motion.title}
              leadElm={(
                <p className="systems-header-lead">{locale.sectionHeaders.motion.body}</p>
              )}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default Personality;
