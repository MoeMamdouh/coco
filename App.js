import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';

const image = require('./assets/menu.png');

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class Basic extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  animationStyle = value => {
    return {
      transform: [
        {
          scale: value.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0.7],
          }),
        },
      ],
      left: value,
    };
  };

  animationFunction = (prop, value) => {
    return Animated.spring(prop, {
      toValue: value,
      friction: 8,
      tension: 50,
    });
  };

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        openMenuOffset={100}
        onChange={isOpen => this.updateMenuState(isOpen)}
        animationFunction={this.animationFunction}
        animationStyle={this.animationStyle}
      >
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+Control+Z for dev menu
          </Text>
          <Text style={styles.instructions}>
            Current selected menu item is: {this.state.selectedItem}
          </Text>
        </View>
        <TouchableOpacity onPress={this.toggle} style={styles.button}>
          <Image source={image} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
      </SideMenu>
    );
  }
}
