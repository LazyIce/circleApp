import React, { Component } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
const { width, height } = Dimensions.get('window');

export default class Swiper extends Component {
    static defaultProps = {
        // Arrange screens horizontally
        horizontal: true,
        // Scroll exactly to the next screen, instead of continous scrolling
        pagingEnabled: true,
        // Hide all scroll indicators
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        // Do not bounce when the end is reached
        bounces: false,
        // Do not scroll to top when the status bar is tapped
        scrollsToTop: false,
        // Remove offscreen child views
        removeClippedSubviews: true,
        // Do not adjust content behind nav-, tab- or toolbars automatically
        automaticallyAdjustContentInsets: false,
        // Fisrt is screen is active
        index: 0
    };
  
    state = this.initState(this.props);
  
    initState(props) {
        const total = props.children ? props.children.length || 1 : 0,
            index = total > 1 ? Math.min(props.index, total - 1) : 0,
            offset = width * index;
  
        const state = {
            total,
            index,
            offset,
            width,
            height,
        };
  
        this.internals = {
            isScrolling: false,
            offset
        };
  
      return state;
    }
  
    onScrollBegin = e => {
        this.internals.isScrolling = true;
    }
  
    onScrollEnd = e => {
        this.internals.isScrolling = false;
    
        this.updateIndex(e.nativeEvent.contentOffset
            ? e.nativeEvent.contentOffset.x
            : e.nativeEvent.position * this.state.width
        );
    }
  
    onScrollEndDrag = e => {
        const { contentOffset: { x: newOffset } } = e.nativeEvent,
            { children } = this.props,
            { index } = this.state,
            { offset } = this.internals;
  
        if (offset === newOffset &&
            (index === 0 || index === children.length - 1)) {
            this.internals.isScrolling = false;
        }
    }
  
    updateIndex = (offset) => {
        const state = this.state,
            diff = offset - this.internals.offset,
            step = state.width;
        let index = state.index;
  
        if (!diff) {
            return;
        }
  
        index = parseInt(index + Math.round(diff / step), 10);

        this.internals.offset = offset;

        this.setState({
            index
        });
    }
  
    swipe = () => {
        if (this.internals.isScrolling || this.state.total < 2) {
            return;
        }
    
        const state = this.state,
            diff = this.state.index + 1,
            x = diff * state.width,
            y = 0;
    
        this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

        this.internals.isScrolling = true;

        if (Platform.OS === 'android') {
            setImmediate(() => {
                this.onScrollEnd({
                    nativeEvent: {
                        position: diff
                    }
                });
            });
        }
    }
  
    renderScrollView = pages => {
      return (
            <ScrollView ref={component => { this.scrollView = component; }}
                {...this.props}
                contentContainerStyle={[styles.wrapper, this.props.style]}
                onScrollBeginDrag={this.onScrollBegin}
                onMomentumScrollEnd={this.onScrollEnd}
                onScrollEndDrag={this.onScrollEndDrag}
            >
                {pages.map((page, i) =>
                    <View style={[styles.fullScreen, styles.slide]} key={i}>
                        {page}
                    </View>
                )}
            </ScrollView>
      );
    }
  
    renderPagination = () => {
        if (this.state.total <= 1) {
            return null;
        }
    
        const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
            Dot = <View style={styles.dot} />;
    
        let dots = [];
    
        for (let key = 0; key < this.state.total; key++) {
            dots.push(key === this.state.index
            ? React.cloneElement(ActiveDot, { key })
            : React.cloneElement(Dot, { key })
            );
        }
    
        return (
            <View
                pointerEvents="none"
                style={[styles.pagination, styles.fullScreen]}
                >
                {dots}
            </View>
        );
    }
  
    renderButton = () => {
        const lastScreen = this.state.index === this.state.total - 1;
        return (
            <View pointerEvents="box-none" style={[styles.buttonWrapper, styles.fullScreen]}>
                {lastScreen
                    ? <Button title="Start Now" type='outline' buttonStyle={styles.button} titleStyle={styles.btnFont} onPress={() => this.props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Init' })]
                      }))} />
                    : <Button title="Continue" type='outline' buttonStyle={styles.button} titleStyle={styles.btnFont} onPress={() => this.swipe()} />
                }
            </View>
        );
    }
  
    render = ({ children } = this.props) => {
        return (
            <View style={[styles.container, styles.fullScreen]}>
                {this.renderScrollView(children)}
                {this.renderPagination()}
                {this.renderButton()}
            </View>
        );
    }
  }

const styles = StyleSheet.create({
    fullScreen: {
        width: width,
        height: height
    },
    container: {
        backgroundColor: 'transparent',
        position: 'relative'
    },
    slide: {
        backgroundColor: 'transparent'
    },
    pagination: {
        position: 'absolute',
        bottom: 110,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'transparent'
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.25)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDot: {
        backgroundColor: '#A489EF',
    },
    buttonWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 40,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        width: width / 3,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#A489EF',
        color: '#A489EF'
    },
    btnFont: {
        color: '#A489EF'
    }
});