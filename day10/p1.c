#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];
    
    int cycle = 1, sum = 0, x = 1;

    while(fgets(line, sizeof(line), file)) {
        int loops = line[0] == 'a' ? 2 : 1;
        
        for(int i = 0; i < loops; i++) {
            if((cycle - 20) % 40 == 0) {
                sum += cycle * x;
            }
            cycle++;
        }

        if(loops == 2) {
            char *num = strtok(line, " ");
            num = strtok(NULL, " ");
            x += strtol(num, NULL, 10);
        }
    }

    printf("%d", sum);

    fclose(file);

    return 0;
}