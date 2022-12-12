#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main()
{
    char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];

    int pairs = 0;

    while(fgets(line, sizeof(line), file)) {
        int elves[4];
        char section[4];
        for(int i = 0, j = 0, elf = 0; i <= strlen(line); i++) {      
            if(line[i] == '-' || line[i] == ',' || line[i] == '\0') {
                section[j] = '\0';
                elves[elf++] = atoi(section);
                j = 0;
            }
            else {
                section[j++] = line[i];
            }
        }
        if(elves[2] <= elves[0] && elves[3] >= elves[0] || elves[0] <= elves[2] && elves[1] >= elves[2]) {
            pairs++;
        }
    }

    printf("Pairs: %d\n", pairs);

    fclose(file);
    return 0;
}