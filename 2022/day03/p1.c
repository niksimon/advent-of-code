#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main()
{
    char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];

    int sum = 0;

    while(fgets(line, sizeof(line), file)) {
        int len = strlen(line) - 1;
        for(int i = 0, found = 0; !found && i < len / 2; i++) {
            for(int j = len / 2; j < len; j++) {
                if(line[i] == line[j]) {
                    if(line[i] >= 97 && line[i] <= 122) {
                        sum += line[i] - 96;
                    }
                    else {
                        sum += line[i] - 38;
                    }
                    found = 1;
                    break;
                }
            }
        }
    }

    printf("%d", sum);

    fclose(file);
    return 0;
}