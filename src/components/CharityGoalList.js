import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from './../Constants'

class CharityGoalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allData: props.data,
            displayData: this.getInitialDisplayItems(props.data),
        }
    }

    getInitialDisplayItems(data) {
        this.initialDisplayNum = 2
        return data.slice(0, this.initialDisplayNum)
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        console.log(id)
    }

    _renderItem = ({item}) => (
        <CharityGoalListItem
            id={item.id}
            onPressItem={this._onPressItem}
            title={item.title}
            goalState={item.goalState}
        />
    )

    renderSeparator = () => {
        return (
            <View style={{height: 1, width: '100%', backgroundColor: colors.charityListBorder}}/>
        )
    }

    _onPressViewAll = () => {
        this.setState((state, props) => ({
            displayData: state.allData
        }))
    }

    render() {
        return (
            <View>
                <View>
                    <FlatList
                        style={{ width: '100%' }}
                        data={this.state.displayData}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderSeparator}
                        ListFooterComponent={this.renderSeparator}
                    />
                </View>

                {
                    this.state.displayData.length < this.state.allData.length &&
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 16, marginTop: 4 }} onPress={this._onPressViewAll}>
                        <Text style={{ color: colors.gray, fontFamily: 'Roboto', fontSize: '13px', marginRight: 8 }}>{'View All'}</Text>
                        <Icon name='angle-down' size={18} color={colors.gray} />
                    </TouchableOpacity>
                }
            </View>

        )
    }
}

class CharityGoalListItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            title: props.title,
            goalState: props.goalState,
        }
        this.onPressItem = this.props.onPressItem
    }
    _onPress = () => {
        this.onPressItem(this.state.id)
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onPress} disabled={this.state.goalState !== 'Completed'}>
                <View style={styles.listItemContainer}>
                    <Text style={styles.cityTitle}>{this.state.title}</Text>
                    {
                        this.state.goalState === 'Completed' ?
                        <Badge value={<Text style={styles.cityBadgeText}>{this.state.goalState}</Text>} status='success' />:
                        <Badge value={<Text style={styles.cityBadgeText}>{this.state.goalState}</Text>} status='warning' />
                    }
                    {
                        this.state.goalState === 'Completed' &&
                        <View style={styles.viewDetail}>
                            <Text style={styles.viewDetailText}>{'View Details'}</Text>
                            <Icon name='angle-right' size={20} color={colors.gray}/>
                        </View>
                    }

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 22,
    },
    cityTitle: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: '17px',
        fontWeight: '500',
        color: colors.black,
        marginRight: 8,
        marginLeft: 8,
    },
    cityBadgeText: {
        fontFamily: 'Roboto',
        fontSize: '12px',
        color: colors.gray,
        marginLeft: 19,
        marginRight: 19,
    },
    viewDetail: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 8,
    },
    viewDetailText: {
        fontFamily: 'Roboto',
        fontSize: '13px',
        color: colors.gray,
        marginRight: 19,
    },
})

export default CharityGoalList