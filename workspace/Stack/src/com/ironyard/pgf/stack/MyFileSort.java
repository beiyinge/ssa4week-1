package com.ironyard.pgf.stack;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyFileSort {
	private File inputFile;
	private File outputFile;

	public MyFileSort(File inputFile, File outputFile) {
		this.inputFile = inputFile;
		this.outputFile = outputFile;
	}
	
	public void sort() throws IOException {
		FileReader fr = null;
		PrintStream fw = null;
		try {
			fr = new FileReader(inputFile);
			BufferedReader br = new BufferedReader(fr);
			List<String> lines = new ArrayList<String>();
			String line;
			while((line = br.readLine()) != null) {
				lines.add(line);
			}
			Collections.sort(lines, String.CASE_INSENSITIVE_ORDER);
			fw = new PrintStream(outputFile);
			for(String tmpStr : lines) {
				fw.println(tmpStr);
			}
		}
		finally {
			if(fr != null) {
				try {
					fr.close();
				} catch (IOException e) {
					e.printStackTrace(System.err);
				}
			}
			if(fw != null) {
				fw.close();
			}
		}
	}

	public static void main(String[] args) {
		if(args.length < 2) {
			System.err.println("usage: MyFileSort <input file> <output file>");
			return;
		}
		MyFileSort myFileSort = new MyFileSort(new File(args[0]), 
									new File(args[1]));
		
		try {
			myFileSort.sort();
		} catch (IOException e) {
			e.printStackTrace(System.err);
		}
	}

}
