const React = require('react-native')
const {StyleSheet} = React

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#0081f0',
    flex: 1,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#ff9d00',
    color: '#000',
    fontWeight: 'bold',
  },
  city: {
    fontSize: 40,
    textAlign: 'right',
    margin: 0,
    color: '#000',
  },
  date: {
    fontSize: 25,
    textAlign: 'right',
    margin: 0,
    color: '#000',
  },
  temp: {
    fontSize: 80,
    textAlign: 'center',
    marginTop: 70,
    color: '#000',
  },
  msg: {
    marginRight: 20,
    marginLeft: 20,
    flex: 0.35,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    fontSize: 20,
    color: '#000',
  },
  msgText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
})

module.exports = styles