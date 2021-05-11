import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { SpaceListItem } from '@momentum-ui/react';

describe('tests for <SpaceListItem />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<SpaceListItem header='header' />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render childrenLeft', () => {
    const container = mount(
      <SpaceListItem
        header='header'
        childrenLeft={<div className='test'>Test</div>}
      />
    );

    expect(container.find('.test').length).toEqual(1);
  });

  it('should render childrenRight', () => {
    const container = mount(
      <SpaceListItem
        header='header'
        childrenRight={<div className='test'>Test</div>}
      />
    );

    expect(container.find('.test').length).toEqual(1);
  });

  it('should render one SpaceListItem', () => {
    const container = mount(<SpaceListItem header='header' />);

    expect(container.find('.md-list-item--space').exists()).toEqual(true);
  });

  it('should handle isOverview prop', () => {
    const container = mount(<SpaceListItem isOverview header='header' />);

    expect(container.find('.md-list-item__header--overview').length).toEqual(
      1
    );
    expect(container.find('.md-avatar__icon--overview').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(
      <SpaceListItem className='menuItem' header='header' />
    );

    expect(
      container.find('.md-list-item--space').hasClass('menuItem')
    ).toEqual(true);
  });

  it('should handle header prop', () => {
    const container = mount(<SpaceListItem header='header' />);

    expect(container.find('.md-list-item__header').text()).toEqual('header');
  });

  it('should handle subheader prop', () => {
    const container = mount(
      <SpaceListItem subheader='subheader' header='header' />
    );

    expect(container.find('.md-list-item__subheader').text()).toEqual('subheader');
  });

  it('should handle isBold prop', () => {
    const container = mount(
      <SpaceListItem subheader='subheader' header='header' isBold />
    );

    expect(container.find('.md-list-item--unread').exists()).toEqual(true);
  });

  it('should handle isDecrypting prop', () => {
    const container = mount(
      <SpaceListItem subheader='subheader' header='header' isDecrypting />
    );

    expect(container.find('.md-decrypting').exists()).toEqual(true);
  });

  describe('should handle logic of icon props', () => {
    it('should handle isAlertOn', () => {
      const container = mount(<SpaceListItem isAlertOn header='header' />);

      expect(container.find('i').prop('className')).toEqual('md-icon icon icon-alert_12');
    });

    it('should prioritize isMentioned', () => {
      const container = mount(
        <SpaceListItem isAlertOn isMentioned header='header' />
      );

      expect(container.find('i').prop('className')).toEqual('md-icon icon icon-mention_12');
    });

    it('should prioritize isUnread', () => {
      const container = mount(
        <SpaceListItem isUnread isAlertOn isMentioned header='header' />
      );

      expect(container.find('.icon-unread-badge_12').length).toEqual(1);
    });

    it('should prioritize isMuted', () => {
      const container = mount(
        <SpaceListItem isMuted isUnread isAlertOn isMentioned header='header' />
      );

      expect(container.find('.md-list-item--unread').exists()).toEqual(false);
      expect(container.find('i').prop('className')).toEqual('md-icon icon icon-alert-muted_12');
    });

    it('should prioritize childrenRight over icon', () => {
      const container = mount(
        <SpaceListItem
          isMuted
          isUnread
          isAlertOn
          isMentioned
          childrenRight={<div className='test'>Test</div>}
          header='header'
        />
      );

      expect(container.find('.test').length).toEqual(1);
    });
  });

  describe('tests for searchTerm prop', () => {
    it('should add header--overview class', () => {
      const container = mount(
        <SpaceListItem header='header' searchTerm='header' />
      );

      expect(container.find('.md-list-item__header--overview').exists()).toEqual(true);
    });

    it('should highlight header', () => {
      const container = mount(
        <SpaceListItem header='header' searchTerm='header' />
      );

      expect(container.find('.md-list-item__header--highlight').exists()).toEqual(true);
    });

    it('should not highlight header if (header = node)', () => {
      const container = mount(
        <SpaceListItem header={<span>header</span>} searchTerm='header' />
      );

      expect(container.find('.md-list-item__header--highlight').exists()).toEqual(false);
    });
  });

  describe('tests for highlightColor prop', () => {
    it('should handle highlightColor on header', () => {
      const container = mount(
        <SpaceListItem header='header' searchTerm='header' highlightColor='black'/>
      );

      expect(container.find('.md-list-item__header--highlight').props().style.color).toEqual('black');
    });

    it('should handle highlightColor on header', () => {
      const container = mount(
        <SpaceListItem header='header' subheader='subheader' type='search' searchTerm='header' highlightColor='black'/>
      );

      expect(container.find('.md-list-item__subheader--highlight').props().style.color).toEqual('black');
    });
  });

  describe('tests for headerSecondary prop', () => {
    it('should not render secondary header without proper type', () => {
      const container = mount(
        <SpaceListItem header='header' headerSecondary='010101'/>
      );

      expect(container.find('.md-list-item__header-secondary').exists()).toEqual(false);
    });

    it('should render secondary header with search type', () => {
      const container = mount(
        <SpaceListItem header='header' headerSecondary='010101' type='search'/>
      );

      expect(container.find('.md-list-item__header-secondary').exists()).toEqual(true);
    });

    it('should render secondary header with filter type', () => {
      const container = mount(
        <SpaceListItem header='header' headerSecondary='010101' type='filter'/>
      );

      expect(container.find('.md-list-item__header-secondary').exists()).toEqual(true);
    });

    it('should render secondary header with flag type', () => {
      const container = mount(
        <SpaceListItem header='header' headerSecondary='010101' type='flag'/>
      );

      expect(container.find('.md-list-item__header-secondary').exists()).toEqual(true);
    });

    it('should render secondary header with filter-search type', () => {
      const container = mount(
        <SpaceListItem header='header' headerSecondary='010101' type='filter-search'/>
      );

      expect(container.find('.md-list-item__header-secondary').exists()).toEqual(true);
    });
  });

  describe('tests for type prop', () => {
    describe('tests for handling search type prop', () => {
      it('should handle search type', () => {
        const container = mount(
          <SpaceListItem type='search' header='header' />
        );

        expect(container.find('.md-list-item__attachment').exists()).toEqual(false);
        expect(container.find('.md-list-item__subheader').exists()).toEqual(false);
        expect(container.find('.md-list-item--space-search').exists()).toEqual(true);
      });

      it('should not highlight header', () => {
        const container = mount(
          <SpaceListItem type='search' header='header' searchTerm='header' />
        );

        expect(container.find('.md-list-item__header--highlight').exists()).toEqual(false);
      });

      it('should highlight subheader', () => {
        const container = mount(
          <SpaceListItem type='search' header='header' subheader='subheader' searchTerm='header' />
        );

        expect(container.find('.md-list-item__subheader--highlight').exists()).toEqual(true);
      });

      it('should not highlight subheader if (subheader = node)', () => {
        const container = mount(
          <SpaceListItem type='search' header='header' subheader={<span>subheader</span>} searchTerm='header' />
        );

        expect(container.find('.md-list-item__subheader--highlight').exists()).toEqual(false);
      });
    });

    it('should handle filter-summary type', () => {
      const container = mount(
        <SpaceListItem type='filter-summary' header='header' />
      );

      expect(container.find('.md-list-item__attachment').exists()).toEqual(false);
      expect(container.find('.md-list-item__subheader').exists()).toEqual(true);
      expect(container.find('.md-list-item--space-filter-summary').exists()).toEqual(true);
    });

    describe('tests for handling filter type prop', () => {
      it('should handle filter type', () => {
        const container = mount(
          <SpaceListItem type='filter' header='header' />
        );

        expect(container.find('.md-list-item__attachment').exists()).toEqual(false);
        expect(container.find('.md-list-item__subheader').exists()).toEqual(false);
        expect(container.find('.md-list-item--space-filter').exists()).toEqual(true);
      });

      it('should not highlight header', () => {
        const container = mount(
          <SpaceListItem type='filter' header='header' searchTerm='header' />
        );

        expect(container.find('.md-list-item__header--highlight').exists()).toEqual(false);
      });

      it('should highlight subheader', () => {
        const container = mount(
          <SpaceListItem type='filter' header='header' subheader='subheader' searchTerm='header' />
        );

        expect(container.find('.md-list-item__subheader--highlight').exists()).toEqual(true);
      });

      it('should highlight subheader with special characters', () => {
        const container = mount(
          <SpaceListItem type='filter' header='header' subheader='(subheader)' searchTerm='(subheader)' />
        );

        expect(container.find('.md-list-item__subheader--highlight').text()).toEqual('(subheader)');
      });

      it('should not highlight subheader if (subheader = node)', () => {
        const container = mount(
          <SpaceListItem type='filter' header='header' subheader={<span>subheader</span>} searchTerm='header' />
        );

        expect(container.find('.md-list-item__subheader--highlight').exists()).toEqual(false);
      });
    });

    describe('tests for handling flag type prop', () => {
      it('should handle flag type', () => {
        const container = mount(
          <SpaceListItem type='flag' header='header' />
        );

        expect(container.find('.md-list-item__attachment--bottom').exists()).toEqual(false);
        expect(container.find('.md-list-item__attachment--top-right').exists()).toEqual(false);
        expect(container.find('.md-list-item__subheader').exists()).toEqual(false);
        expect(container.find('.md-list-item__attachment').exists()).toEqual(true);
        expect(container.find('.md-list-item--space-flag').exists()).toEqual(true);
      });

      it('should handle flag with resultRight', () => {
        const container = mount(
          <SpaceListItem type='flag' header='header' resultRight={<span className='testright' />} />
        );

        expect(container.find('.md-list-item__attachment--bottom').exists()).toEqual(false);
        expect(container.find('.md-list-item__attachment--top-right').exists()).toEqual(true);
        expect(container.find('.md-list-item__subheader').exists()).toEqual(false);
        expect(container.find('.md-list-item__attachment').exists()).toEqual(true);
        expect(container.find('.md-list-item--space-flag').exists()).toEqual(true);
      });

      it('should handle flag with attachment', () => {
        const container = mount(
          <SpaceListItem type='flag' header='header' attachments={[<span className='testright' key='attach-0'/>]} />
        );

        expect(container.find('.md-list-item__attachment--bottom').exists()).toEqual(true);
        expect(container.find('.md-list-item__attachment--top-right').exists()).toEqual(false);
        expect(container.find('.md-list-item__subheader').exists()).toEqual(false);
        expect(container.find('.md-list-item__attachment').exists()).toEqual(true);
        expect(container.find('.md-list-item--space-flag').exists()).toEqual(true);
      });
    });

    it('should handle filter-search type', () => {
      const container = mount(
        <SpaceListItem type='filter-search' header='header' />
      );

      expect(container.find('.md-list-item__attachment').exists()).toEqual(false);
      expect(container.find('.md-list-item__subheader').exists()).toEqual(false);
      expect(container.find('.md-list-item--space-filter-search').exists()).toEqual(true);
    });
  });

  it('should pass props to ListItem', () => {
    const customAnchorNode = <div className='custom-class' />;
    const container = mount(
      <SpaceListItem customAnchorNode={customAnchorNode} header='header' />
    );

    expect(container.find('.custom-class').length).toEqual(1);
  });

  it('should do nothing with resultRight without proper type', () => {
    const container = mount(
      <SpaceListItem header='header' resultRight={<span className='testright' />} />
    );

    expect(container.find('.md-list-item__attachment--top-right').exists()).toEqual(false);
  });

  describe('tests for title Prop', () => {
    it('should not have title by default if header is node', () => {
      const container = mount(
        <SpaceListItem header={<div>test</div>} />
      );

      expect(container.find('.md-list-item').props().title).toEqual(undefined);
    });

    it('should handle title prop', () => {
      const container = mount(
        <SpaceListItem header='header' title='testTitle'/>
      );

      expect(container.find('.md-list-item').props().title).toEqual('testTitle');
    });

    it('should handle title if header is string', () => {
      const container = mount(
        <SpaceListItem header='testTitle'/>
      );

      expect(container.find('.md-list-item').props().title).toEqual('testTitle');
    });
  });
});
