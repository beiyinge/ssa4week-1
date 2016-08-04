package com.ironyard.pgf.stack;

public class LinkedValue {
	LinkedValue prev = null;
	LinkedValue next = null;
	int value;

	public LinkedValue(int value) {
		this.value = value;
	}
}
