import 'package:flutter/material.dart';

import './summary.dart';
import './profile.dart';
import './test.dart';

class MainPage extends StatefulWidget {
  MainPage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _selectedIndex = 0;
  final List<Widget> _children = [
    SummaryPage(),
    TestPage(),
    ProfilePage(),
  ];

  void _onBottomNavItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: _children[_selectedIndex],
        bottomNavigationBar: BottomNavigationBar(
          items: <BottomNavigationBarItem>[
            BottomNavigationBarItem(
                icon: Icon(Icons.home), title: Text('Main')),
            BottomNavigationBarItem(
                icon: Icon(Icons.add_circle_outline), title: Text('New Test')),
            BottomNavigationBarItem(
                icon: Icon(Icons.account_box), title: Text('Profile')),
          ],
          currentIndex: _selectedIndex,
          onTap: _onBottomNavItemTapped,
        ));
  }
}
