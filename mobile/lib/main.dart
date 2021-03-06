import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import './Pages/main.dart';

void main() {
  DotEnv().load('.env');
  runApp(MyApp());
}

const appTitle = 'Project 21';
const mainHeader = 'Project 21';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appTitle,
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
      home: MainPage(title: mainHeader),
    );
  }
}
