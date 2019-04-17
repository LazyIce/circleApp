import { createStackNavigator } from  'react-navigation';
import OnboardScreen from './../views/OnboardScreen'
import TimerScreen from './../views/TimerScreen'
import InitScreen from './../views/InitScreen'

const stackNav = createStackNavigator(
    {
        Onboard: {
            screen: OnboardScreen
        },
        Init: {
            screen: InitScreen
        },
        Timer : {
            screen: TimerScreen
        },
    }, {
        headerMode: "none"
    }
);

export default stackNav;