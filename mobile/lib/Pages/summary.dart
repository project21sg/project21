import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class SummaryPage extends StatefulWidget {
  SummaryPage();

  final baseUrl = DotEnv().env['BASE_URL'];

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
