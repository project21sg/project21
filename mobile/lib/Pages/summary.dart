import 'package:flutter/material.dart';

class SummaryPage extends StatefulWidget {
  SummaryPage();

  @override
  _SummaryPageState createState() => _SummaryPageState();
}

class _SummaryPageState extends State<SummaryPage> {
  @override
  Widget build(BuildContext context) {
    return Center(
        child: Card(
            child: Column(children: <Widget>[
      const ListTile(title: Text('Fall Risk'), subtitle: Text('Level')),
      const ListTile(title: Text('Stats'), subtitle: Text('Power')),
      const ListTile(title: Text('Tea Parasite'), subtitle: Text('Speed')),
    ])));
  }
}
