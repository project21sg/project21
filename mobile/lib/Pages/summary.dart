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
      const ListTile(
          title: Text('Overall Fall Risk Level'), subtitle: Text('Level')),
    ])));
  }
}
