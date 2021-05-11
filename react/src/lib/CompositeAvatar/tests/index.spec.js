import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Avatar, CompositeAvatar } from '@momentum-ui/react';

describe('tests for <CompositeAvatar />', () => {
  it('should match SnapShot', () => {
    const container = shallow(
      <CompositeAvatar>
        <Avatar title="test1" />
        <Avatar title="test2" />
      </CompositeAvatar>
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  describe('composite avatars of different sizes  ', () => {
    it('when size is small/28', () => {
      let container = mount(
        <CompositeAvatar size="small">
          <Avatar title="test1" />
          <Avatar title="test2" />
        </CompositeAvatar>
      );
      expect(
        container
          .find('.md-composite-avatar')
          .hasClass('md-composite-avatar--small')
      ).toEqual(true);
      expect(container.find('.md-avatar').length).toEqual(2);
      container = mount(
        <CompositeAvatar size={28}>
          <Avatar title="test1" />
          <Avatar title="test2" />
        </CompositeAvatar>
      );
      expect(
        container
          .find('.md-composite-avatar')
          .hasClass('md-composite-avatar--28')
      ).toEqual(true);
    });

    it('when size is medium/40', () => {
      let container = mount(
        <CompositeAvatar>
          <Avatar title="test1" />
          <Avatar title="test2" />
        </CompositeAvatar>
      );
      expect(
        container
          .find('.md-composite-avatar')
          .hasClass('md-composite-avatar--medium')
      ).toEqual(true);
      expect(container.find('.md-avatar').length).toEqual(2);
      container = mount(
        <CompositeAvatar size={40}>
          <Avatar title="test1" />
          <Avatar title="test2" />
        </CompositeAvatar>
      );
      expect(
        container
          .find('.md-composite-avatar')
          .hasClass('md-composite-avatar--40')
      ).toEqual(true);
    });

    it('when size is 84', () => {
      let container = mount(
        <CompositeAvatar size={84}>
          <Avatar title="test1" />
          <Avatar title="test2" />
        </CompositeAvatar>
      );

      expect(container.find('.md-avatar').length).toEqual(2);
      expect(
        container
          .find('.md-composite-avatar')
          .hasClass('md-composite-avatar--84')
      ).toEqual(true);
    });

    it('when size is large/135', () => {
      let container = mount(
        <CompositeAvatar size="large">
          <Avatar title="test1" />
          <Avatar title="test2" />
        </CompositeAvatar>
      );
      expect(
        container
          .find('.md-composite-avatar')
          .hasClass('md-composite-avatar--large')
      ).toEqual(true);
      expect(container.find('.md-avatar').length).toEqual(2);
      container = mount(
        <CompositeAvatar size={135}>
          <Avatar title="test1" />
          <Avatar title="test2" />
        </CompositeAvatar>
      );
      expect(
        container
          .find('.md-composite-avatar')
          .hasClass('md-composite-avatar--135')
      ).toEqual(true);
    });
  });

  it('should not throw an error when 2 Avatar components are not present as children', () => {
    const container = shallow(
      <CompositeAvatar size="large">
        <Avatar title="test2" />
      </CompositeAvatar>
    );

    expect(
      container
        .find('.md-composite-avatar')
        .hasClass('md-composite-avatar--large')
    ).toEqual(true);
  });

  it('should allow Avatar components to be wrapped', () => {
    const container = shallow(
      <CompositeAvatar size="large">
        <div>
          <Avatar title="test2" />
        </div>
      </CompositeAvatar>
    );

    expect(
      container
        .find('.md-composite-avatar')
        .hasClass('md-composite-avatar--large')
    ).toEqual(true);
  });
});
