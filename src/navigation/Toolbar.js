import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { goBack, navigateTo } from "./../redux/actions/routes.action";
import { bgHeader } from "./../global.styles";

class Toolbar extends Component {
  onActionSelected = position => {
    const { navigateTo } = this.props;
    if (position === 0) {
      navigateTo("About");
    } else if (position === 1) {
      navigateTo("Credits");
    }
  };

  render() {
    const { showMenu, goBack, activeRoute, routes } = this.props;

    return (
      <View style={styles.header}>
        <Icon.TabBarItem
          navIconName={
            activeRoute.name === routes[0].name ? "menu" : "arrow-left"
          }
          titleColor="#fff"
          title={activeRoute.name}
          onIconClicked={
            activeRoute.name === routes[0].name ? showMenu : goBack
          }
          overflowIconName="dots-vertical"
          style={{ height: 56 }}
          actions={[
            { title: "About", show: "never", iconName: "information-outline" },
            { title: "Credits", show: "never", iconName: "account-circle" }
          ]}
          onActionSelected={this.onActionSelected}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: bgHeader,
    height: 80, // 56dp AppBar height plus 24dp correction for the StatusBar translucent
    paddingTop: 24 // StatusBar's height
  }
});

const mapStateToProps = (state, ownProps) => ({
  activeRoute: state.routes.activeRoute,
  routes: state.routes.routes,
  showMenu: ownProps.showMenu,
  goBack: ownProps.goBack
});

const mapDispatchToProps = dispatch => ({
  goBack: () => {
    dispatch(goBack());
  },
  navigateTo: routeName => {
    dispatch(navigateTo(routeName));
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Toolbar);