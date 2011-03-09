on run argv
	tell application "Adobe Photoshop CS5"
		do javascript (item 1 of argv) --DEBUGGER
	end tell
end run
