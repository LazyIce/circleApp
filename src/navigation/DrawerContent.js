import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { drawerInactiveItemColor, bgDrawerInactiveItem, bgDrawerActiveItem, drawerHeaderColor
} from './../global.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigateTo } from './../redux/actions/routes.action';

class DrawerContent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                {routes.map(route => (
                    <TouchableOpacity
                        key={route.screen}
                        onPress={() => {
                        closeDrawer();
                        navigateTo(route.name);
                        }}
                        style={
                        activeRoute.name === route.name
                            ? [styles.drawerItem, styles.activeDrawerItem]
                            : styles.drawerItem
                        }
                    >
                        {route.icon && (
                        <View style={styles.drawerItemLogo}>
                            <Icon
                            name={route.icon}
                            size={30}
                            color={activeRoute.name === route.name ? "#fff" : "#000"}
                            />
                        </View>
                        )}
                        <Text
                        style={
                            activeRoute.name === route.name
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                        >
                        {route.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  drawerTitle: {
    color: drawerHeaderColor,
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 14
  },
  drawerEmail: {
    color: drawerHeaderColor,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14
  },
  activeDrawerItem: {
    backgroundColor: bgDrawerActiveItem
  },
  drawerItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: bgDrawerInactiveItem,
    color: drawerInactiveItemColor,
    height: 50,
    paddingLeft: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#fff"
  },
  drawerItemLogo: {
    paddingRight: 16
  }
});

const mapStateToProps = (state, ownProps) => ({
  routes: state.routes.routes,
  activeRoute: state.routes.activeRoute,
  closeDrawer: ownProps.closeDrawer,
});

const mapDispatchToProps = dispatch => ({
  navigateTo: routeName => {
    dispatch(navigateTo(routeName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);