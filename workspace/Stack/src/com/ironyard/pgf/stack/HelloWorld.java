package com.ironyard.pgf.stack;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class HelloWorld {
	public static void main(String[] args) {
		try {
			List<String> lines = Files.readAllLines(Paths.get("words.txt"),
									StandardCharsets.UTF_8);
			System.out.println(lines);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.err);
		}
	}

	public HelloWorld() {
		super();
		// TODO Auto-generated constructor stub
	}
}
