import { createStackNavigator } from  'react-navigation';
import TimerScreen from './../views/TimerScreen'

const stackNav = createStackNavigator(
    {
        Timer : {
            screen: TimerScreen
        },
    },{
        headerMode: "none"
    }
);

export default stackNav;