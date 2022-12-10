#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main()
{
    char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[3][256];

    int sum = 0;

    while(fgets(line[0], sizeof(line[0]), file)) {
        fgets(line[1], sizeof(line[1]), file);
        fgets(line[2], sizeof(line[2]), file);
        for(int i = 0; i < strlen(line[0]); i++) {
            char ch = line[0][i];
            if(strchr(line[1], ch) != NULL && strchr(line[2], ch) != NULL) {
                if(ch >= 97 && ch <= 122) {
                    sum += ch - 96;
                }
                else {
                    sum += ch - 38;
                }
                break;
            }
        }
    }

    printf("%d", sum);

    fclose(file);
    return 0;
}