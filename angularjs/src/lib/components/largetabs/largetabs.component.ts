import * as angular from 'angular';

mdTabsetCtrl.$inject = ['$scope'];
export function mdTabsetCtrl($scope) {
  let vm = this;
  vm.tabs = [];
  vm.destroyed = false;
  vm.select = select;
  vm.addTab = addTab;
  vm.removeTab = removeTab;

  function select(selectedTab) {
    angular.forEach(vm.tabs, function (tab) {
      if (tab.active && tab !== selectedTab) {
        tab.active = false;
        tab.onDeselect();
      }
    });
    selectedTab.active = true;
    selectedTab.onSelect();
  }

  function addTab(tab) {
    vm.tabs.push(tab);
    // we can't run the select function on the first tab
    // since that would select it twice
    if (vm.tabs.length === 1) {
      tab.active = true;
    } else if (tab.active) {
      select(tab);
    }
  }

  function removeTab(tab) {
    let index = vm.tabs.indexOf(tab);
    //Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && vm.tabs.length > 1 && !vm.destroyed) {
      //If this is the last tab, select the previous tab. else, the next tab.
      let newActiveIndex = index === vm.tabs.length - 1 ? index - 1 : index + 1;
      select(vm.tabs[newActiveIndex]);
    }
    vm.tabs.splice(index, 1);
  }

  $scope.$on('$destroy', function () {
    vm.destroyed = true;
  });
}

export function mdTabset() {
  let mdTabsetDirective = {
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      type: '@',
      large: '=large',
      graytab: '=graytab',
    },
    controller: 'mdTabsetCtrl',
    controllerAs: 'mdTabset',
    bindToController: true,
    template: `
      <div class="md-tab--mdtabs"
        ng-class="{'md-tab--graytab': mdTabset.graytab, 'md-tab--largetabs': mdTabset.large, 'md-tab--justified': justified}">
        <ul class="md-tab__list" ng-transclude></ul>
        <div class="md-tab__content">
          <div class="md-tab__pane" ng-repeat="tab in mdTabset.tabs" ng-class="{active: tab.active}" md-tab-content-transclude="tab">
          </div>
        </div>
      </div>
    `,
    link: link,
  };

  function link(scope, element, attrs) {
    scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
    scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
  }

  return mdTabsetDirective;
}

mdTab.$inject = ['$parse'];
export function mdTab($parse) {
  let mdTabDirective = {
    require: '^mdTabset',
    restrict: 'EA',
    replace: true,
    template: `
      <li class="md-tab__item" ng-class="{active: active, disabled: disabled}">
        <a href ng-click="select()" md-tab-heading-transclude>{{mdTabset.heading}}</a>
      </li>
    `,
    transclude: true,
    scope: {
      active: '=?',
      heading: '@',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
      //once it inserts the tab's content into the dom
      onDeselect: '&deselect',
    },
    controller: function () {
      //Empty controller so other directives can require being 'under' a tab
    },
    compile: function (elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, mdTabset) {
        scope.$watch('active', function (active) {
          if (active) {
            mdTabset.select(scope);
          }
        });

        scope.disabled = false;
        if (attrs.disabled) {
          scope.$parent.$watch($parse(attrs.disabled), function (value) {
            scope.disabled = !!value;
          });
        }

        scope.select = function () {
          if (!scope.disabled) {
            scope.active = true;
          }
        };

        mdTabset.addTab(scope);
        scope.$on('$destroy', function () {
          mdTabset.removeTab(scope);
        });

        //We need to transclude later, once the content container is ready.
        //when this link happens, we're inside a tab heading.
        scope.$transcludeFn = transclude;
      };
    },
  };

  return mdTabDirective;
}

export function mdTabHeadingTransclude() {
  let mdTabHeadingTranscludeDirective = {
    restrict: 'A',
    require: '^mdTab',
    link: link,
  };

  function link(scope, elm, attrs, tabCtrl) {
    scope.$watch('headingElement', function updateHeadingElement(heading) {
      if (heading) {
        elm.html('');
        elm.append(heading);
      }
    });
  }

  return mdTabHeadingTranscludeDirective;
}

export function mdTabContentTransclude() {
  let mdTabContentTranscludeDirective = {
    restrict: 'A',
    require: '^mdTabset',
    link: link,
  };

  function link(scope, elm, attrs) {
    let tab = scope.$eval(attrs.mdTabContentTransclude);

    //Now our tab is ready to be transcluded: both the tab heading area
    //and the tab content area are loaded.  Transclude 'em both.
    tab.$transcludeFn(tab.$parent, function (contents) {
      angular.forEach(contents, function (node) {
        if (isTabHeading(node)) {
          //Let tabHeadingTransclude know.
          tab.headingElement = node;
        } else {
          elm.append(node);
        }
      });
    });
  }

  function isTabHeading(node) {
    return node.tagName && (
      node.hasAttribute('md-tab-heading') ||
      node.hasAttribute('data-md-tab-heading') ||
      node.tagName.toLowerCase() === 'md-tab-heading' ||
      node.tagName.toLowerCase() === 'data-md-tab-heading'
    );
  }

  return mdTabContentTranscludeDirective;
}
