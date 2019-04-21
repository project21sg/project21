import 'package:flutter/material.dart';

import './tests/test_sequences.dart';

// sets up bluetooth connections, listeners before proceeding with test?
class TestPage extends StatefulWidget {
  TestPage();

  @override
  _TestPageState createState() => _TestPageState();
}

class _TestPageState extends State<TestPage> {
  final _instructions = [
    '1. Connect your P21 device.',
    '2. Flail ur arms around.',
    '3. Dance if you want to.'
  ];

  _proceedWithTest(context) {
    Navigator.push(context,
        MaterialPageRoute<void>(builder: (BuildContext context) {
      return TestSequences();
    }));
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> instructionItems = _instructions
        .map((text) => Padding(
            padding: EdgeInsets.only(top: 8.0, bottom: 8.0),
            child: Text(
              text,
              textScaleFactor: 1.8,
            )))
        .toList();

    return Container(
        width: double.infinity,
        child: Column(children: <Widget>[
          Column(
              // crossAxisAlignment: CrossAxisAlignment.start,
              // mainAxisSize: MainAxisSize.min,
              children: instructionItems),
          Center(
            child: Image.asset('assets/img/device.png'),
          ),
          ButtonTheme(
              height: 55.0,
              minWidth: 250.0,
              buttonColor: Colors.grey,
              child: RaisedButton.icon(
                  onPressed: () => _proceedWithTest(context),
                  textColor: Colors.black,
                  icon: Icon(Icons.bluetooth),
                  label: const Text(
                    'CONNECT',
                    textScaleFactor: 1.2,
                    style: TextStyle(fontWeight: FontWeight.bold),
                  )))
        ]));
  }
}
