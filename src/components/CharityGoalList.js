import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from './../Constants'

class CharityGoalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allData: props.data || [],
            displayData: CharityGoalList.getInitialDisplayItems(props.data) || [],
        }
    }

    static getInitialDisplayItems(data) {
        if (!data) {
            return undefined
        }
        const initialDisplayNum = 2
        return data.slice(0, initialDisplayNum)
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
        console.log('_onPressViewAll')
        let newDisplayData = this.state.allData
        this.setState({
            displayData: newDisplayData
        })
    }

    static getDerivedStateFromProps = (props, state) => {
        if(props.data != state.allData) {
            return {
                allData: props.data || [],
                displayData: CharityGoalList.getInitialDisplayItems(props.data) || []
            }
        }
        return null
    }

    render() {
        return (
            <View>
                {this.state.displayData.length === 0 &&
                    <Text>No charity goals to display </Text>
                }
                {this.state.displayData.length !== 0 &&
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
                }
                {this.state.displayData.length !== 0 &&
                    this.state.displayData.length < this.state.allData.length &&
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 16, marginTop: 4 }}
                    onPress={() => this._onPressViewAll()}>
                        <Text style={{ color: colors.gray, fontSize: 13, marginRight: 8 }}>{'View All'}</Text>
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
        fontStyle: 'normal',
        fontSize: 17,
        fontWeight: '500',
        color: colors.black,
        marginRight: 8,
        marginLeft: 8,
    },
    cityBadgeText: {
        fontSize: 12,
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
        fontSize: 13,
        color: colors.gray,
        marginRight: 19,
    },
})

export default CharityGoalList