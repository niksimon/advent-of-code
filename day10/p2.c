#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];
    
    int cycle = 0, x = 1;
    char row[40];
    int k = 0;

    while(fgets(line, sizeof(line), file)) {
        int loops = line[0] == 'a' ? 2 : 1;
        
        for(int i = 0; i < loops; i++) {
            int column = cycle % 40;
            row[k++] = x - 1 <= column && column <= x + 1 ? '#' : ' ';
            if(column == 39) {
                row[k] = '\0';
                printf("%s\n", row);
                k = 0;
            }
            cycle++;
        }

        if(loops == 2) {
            char *num = strtok(line, " ");
            num = strtok(NULL, " ");
            x += strtol(num, NULL, 10);
        }
    }

    fclose(file);

    return 0;
}